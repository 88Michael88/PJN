const extraSection = document.getElementById("extra-section");
const extraContent = document.getElementById("extra-content");
const extraStatus = document.getElementById("extra-status");
const extraIntro = document.getElementById("extra-intro");
const sentinel = document.getElementById("lazy-sentinel");

const readMoreButton =
    document.getElementById("read-more-button");
const readMoreSection =
    document.getElementById("read-more-section");
const readMoreContent =
    document.getElementById("read-more-content");
const readMoreStatus =
    document.getElementById("read-more-status");
const readMoreError =
    document.getElementById("read-more-error");

let extraLoaded = false;
let extraLoading = false;
let readMoreLoaded = false;
let readMoreLoading = false;

// Create elements safely. Scraped values are treated as text.
function addTextElement(parent, tag, text, className = "") {
    const element = document.createElement(tag);
    element.textContent = text ?? "";

    if (className) {
        element.className = className;
    }

    parent.appendChild(element);
    return element;
}

function addTableRow(key, value) {
    const row = document.createElement("tr");
    const heading = document.createElement("th");
    const cell = document.createElement("td");

    heading.textContent = key;
    cell.textContent = value == null ? "Not available" :
        typeof value === "object" ? JSON.stringify(value) :
        String(value);

    row.append(heading, cell);
    document.getElementById("specifications").appendChild(row);
}

function addListItem(key, value) {
    const item = document.createElement("li");

    item.textContent =
        `${key}: ${value == null ? "Not available" :
                typeof value === "object" ? JSON.stringify(value) :
                String(value)}`;

    document.getElementById("extra-list").appendChild(item);
}

async function loadExtraData() {
    if (extraLoaded || extraLoading) return;

    extraLoading = true;
    extraStatus.textContent = "Loading additional information...";

    try {
        const response = await fetch(
            `/api/v1/posts/${encodeURIComponent(postId)}/additional-info`
        );

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        // Fields displayed in a table.
        [
            ["Brand", data.brand],
            ["SKU", data.sku],
            ["Condition", data.condition],
            ["Availability", data.availability],
            ["Seller", data.seller]
        ]
            .sort(() => Math.random() - 0.5)
            .forEach(([key, value]) => addTableRow(key, value));

        // Other fields displayed as a list.
        [
            ["Rating", data.rating],
            ["Tags", Array.isArray(data.tags)
                ? data.tags.join(", ")
                : data.tags],
            ["URL", data.url]
        ].forEach(([key, value]) => addListItem(key, value));

        extraContent.classList.remove("hidden");
        extraIntro.classList.add("hidden");
        extraStatus.classList.add("hidden");

        extraLoaded = true;
    } catch (error) {
        console.error("Failed to load general data:", error);
        extraStatus.textContent =
            "Could not load details. Scroll away and return to retry.";
    } finally {
        extraLoading = false;
    }
}

function readOrderOne(data) {
        addTextElement(
            readMoreContent, "h3",
            data.summary || "Summary unavailable"
        );

        addTextElement(
            readMoreContent, "p",
            data.full_text || "No additional text available.",
            "description"
        );

        addTextElement(
            readMoreContent, "p",
            `Author: ${data.author || "Unknown"}`
        );

        addTextElement(
            readMoreContent, "p",
            `Published: ${data.published_date || "Unknown"}`
        );
}

function readOrderTwo(data) {
        addTextElement(
            readMoreContent, "p",
            data.full_text || "No additional text available.",
            "description"
        );

        addTextElement(
            readMoreContent, "h3",
            data.summary || "Summary unavailable"
        );

        addTextElement(
            readMoreContent, "p",
            `Published: ${data.published_date || "Unknown"}`
        );

        addTextElement(
            readMoreContent, "p",
            `Author: ${data.author || "Unknown"}`
        );
}

function readOrderThree(data) {
        addTextElement(
            readMoreContent, "p",
            data.full_text || "No additional text available.",
            "description"
        );

        addTextElement(
            readMoreContent, "p",
            `Published: ${data.published_date || "Unknown"}`
        );

        addTextElement(
            readMoreContent, "h3",
            data.summary || "Summary unavailable"
        );


        addTextElement(
            readMoreContent, "p",
            `Author: ${data.author || "Unknown"}`
        );
}


async function loadReadMore() {
    if (readMoreLoaded || readMoreLoading) return;

    readMoreLoading = true;
    readMoreButton.disabled = true;
    readMoreButton.textContent = "Loading...";
    readMoreError.classList.add("hidden");

    readMoreSection.classList.remove("hidden");
    readMoreStatus.classList.remove("hidden");
    readMoreContent.replaceChildren();

    try {
        const response = await fetch(
            `/api/v1/posts/${encodeURIComponent(postId)}/read-more`
        );

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        switch (Math.floor(Math.random() * 3)) {
            case 0:
                readOrderOne(data);
                break;
            case 1:
                readOrderTwo(data);
                break;
            case 2:
                readOrderThree(data);
                break;
        }

        readMoreLoaded = true;
        readMoreButton.textContent = "Read more loaded";
    } catch (error) {
        console.error("Failed to load read-more data:", error);

        readMoreError.textContent =
            "Could not load the article. Please try again.";
        readMoreError.classList.remove("hidden");
        readMoreButton.textContent = "Try again";
    } finally {
        readMoreLoading = false;
        readMoreButton.disabled = false;
        readMoreStatus.classList.add("hidden");
    }
}

// Separate request, triggered only by the button.
readMoreButton.addEventListener("click", loadReadMore);

// Load the extra general fields when the user scrolls near them.
const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
        loadExtraData();
    }
}, {
    rootMargin: "200px",
    threshold: 0
});

observer.observe(sentinel);
