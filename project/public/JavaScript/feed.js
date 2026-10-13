const feed = document.getElementById("feed");
const status = document.getElementById("feed-status");
const sentinel = document.getElementById("feed-sentinel");

const PAGE_SIZE = 10;

// The server should render the first page into the EJS template.
let loading = false;
let hasMore = offset >= PAGE_SIZE;

async function loadMorePosts() {
    if (loading || !hasMore) return;

    loading = true;
    status.textContent = "Loading more posts...";

    try {
        const response = await fetch(
            `/api/v1/feed?limit=${PAGE_SIZE}&offset=${offset}`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        // Expected response: { posts: [...], hasMore: true/false }
        const posts = Array.isArray(result)
            ? result
            : result.posts;

        if (!Array.isArray(posts)) {
            throw new Error("Invalid feed response");
        }

        posts.forEach(post => {
            feed.appendChild(createPostElement(post));
        });

        offset += posts.length;

        hasMore = typeof result.hasMore === "boolean"
            ? result.hasMore
            : posts.length === PAGE_SIZE;

        status.textContent = hasMore
            ? ""
            : "You have reached the end of the feed.";

        // Avoid an infinite request loop if the API returns no data.
        if (posts.length === 0) {
            hasMore = false;
            status.textContent = "No more posts.";
        }
    } catch (error) {
        console.error("Could not load posts:", error);
        status.textContent = "Could not load posts. ";

        const retry = document.createElement("button");
        retry.textContent = "Try again";
        retry.addEventListener("click", loadMorePosts);
        status.appendChild(retry);
    } finally {
        loading = false;
    }
}

function createPostElement(post) {
    // Use textContent rather than innerHTML so scraped HTML
    // and other untrusted values cannot execute as markup.
    const article = document.createElement("article");
    article.className = "post";

    const title = document.createElement("h2");
    title.textContent = post.title ?? "Untitled";
    title.classList = "post-title";
    article.appendChild(title);

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = [
        { text: post.published_date ?? "Date unknown", class: "post-date" },
        { text: post.location, class: "post-location" },
        { text: post.category, class: "post-category" }
    ]
        .filter(item => item.text)
        .map(item => `<span class="${item.class}">${item.text}</span>`)
        .join(' <span class="separator">·</span> ');

    article.appendChild(meta);

    if (post.price != null) {
        const price = document.createElement("div");
        price.className = "price";
        price.textContent = post.price;
        article.appendChild(price);
    }

    const description = document.createElement("div");
    description.className = "description";
    description.textContent = post.description ?? "";
    article.appendChild(description);

    if (post.read_more?.summary) {
        const readMore = document.createElement("div");
        readMore.className = "read-more";

        const heading = document.createElement("strong");
        heading.textContent = "Read more";

        const summary = document.createElement("p");
        summary.className = "post-read-more"
        summary.textContent = post.read_more.summary;

        readMore.append(heading, summary);

        if (post.read_more.source_url) {
            try {
                const url = new URL(
                    post.read_more.source_url,
                    window.location.origin
                );

                // Only allow HTTP(S) source links.
                if (["http:", "https:"].includes(url.protocol)) {
                    const link = document.createElement("a");
                    link.href = url.href;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    link.textContent = "View source";
                    readMore.appendChild(link);
                }
            } catch {
                // Ignore invalid source URLs.
            }
        }

        article.appendChild(readMore);
    }

    const interaction = document.createElement("div");
    interaction.className = "interaction";

    const likes = document.createElement("span");
    likes.className = "likes"
    likes.textContent =
        `♥ ${post.interaction?.likes ?? 0} likes`;

    const comments = document.createElement("span");
    comments.className = "comments"
    comments.textContent =
        `💬 ${post.interaction?.comments_count ?? 0} comments`;

    interaction.append(likes, comments);
    article.appendChild(interaction);

    return article;
}

// Load more when the sentinel approaches the viewport.
const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
        loadMorePosts();
    }
}, {
    root: null,
    rootMargin: "300px",
    threshold: 0
});

if (hasMore) {
    observer.observe(sentinel);
} else {
    status.textContent = "No more posts.";
}
