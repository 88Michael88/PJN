import json
import random
import html
from datetime import date, timedelta
from pathlib import Path

# Configuration
NUM_ROWS = 400
OUTPUT_FILE = "data.json"

random.seed()  # Different randomized data on each run

# Sample data pools
titles = [
        "Wireless Headphones", "Vintage Leather Bag",
        "Smart Watch Pro", "Organic Cotton Shirt",
        "Portable Speaker", "Running Shoes",
        "Ceramic Coffee Mug", "Laptop Stand",
        "Digital Camera", "Travel Backpack",
        "Bluetooth Keyboard", "Stainless Steel Bottle",
        "Fitness Tracker", "Desk Lamp", "Gaming Mouse"
        ]

categories = [
        "Electronics", "Fashion", "Home & Garden",
        "Sports", "Accessories", "Lifestyle",
        "Computers", "Travel"
        ]

brands = [
        "NovaTech", "UrbanStyle", "EcoLiving",
        "ProGear", "Daily Essentials", "TechWorks",
        "Unknown", None
        ]

sellers = [
        "Official Store", "Marketplace Seller",
        "Premium Outlet", "Independent Shop", None
        ]

locations = [
        "Kraków, Poland", "Berlin, Germany",
        "London, UK", "New York, USA",
        "Madrid, Spain", "Paris, France",
        "Amsterdam, Netherlands", None
        ]

currencies = [
        ("EUR", "€"), ("USD", "$"), ("GBP", "£"),
        ("PLN", "zł"), ("CZK", "Kč"), ("JPY", "¥")
        ]

date_formats = [
        "%Y-%m-%d",       # 2026-08-26
        "%d.%m.%Y",       # 26.08.2026
        "%m/%d/%Y",       # 08/26/2026
        "%d/%m/%Y",       # 26/08/2026
        "%b %d, %Y",      # Aug 26, 2026
        "%d %B %Y",       # 26 August 2026
        ]

html_entities = [
        "&nbsp;",
        "&oacute;",
        "&amp;",
        "&quot;",
        "&euro;",
        "&#39;",
        "&lt;",
        "&gt;"
        ]

text_variants = [
        "New item available.",
        "Limited&nbsp;time offer!",
        "Special edition &amp; exclusive design.",
        "Premium quality &oacute;ptimized for daily use.",
        "Price includes taxes &amp; applicable fees.",
        "<strong>Best seller</strong> this season.",
        "Available now&nbsp;— while stocks last.",
        "Customer favorite &#39;recommended choice&#39;."
        ]


def random_date():
    """Generate dates in different formats and relative expressions."""
    today = date.today()
    days_ago = random.randint(0, 500)
    chosen_date = today - timedelta(days=days_ago)

    if days_ago == 0 and random.random() < 0.5:
        return random.choice(["Today", "Just now"])

    if days_ago == 1 and random.random() < 0.5:
        return "Yesterday"

    if days_ago < 7 and random.random() < 0.5:
        return f"{days_ago} days ago"

    return chosen_date.strftime(random.choice(date_formats))


def random_price():
    """Generate prices with different currencies and formats."""
    currency_code, symbol = random.choice(currencies)
    amount = round(random.uniform(5, 2500), 2)

    style = random.choice(["symbol_before", "symbol_after", "code"])

    if style == "symbol_before":
        return f"{symbol}{amount:,.2f}"

    if style == "symbol_after":
        return f"{amount:,.2f} {symbol}"

    return f"{amount:.2f} {currency_code}"


def random_text():
    """Generate text with optional HTML entities and markup."""
    text = random.choice(text_variants)

    if random.random() < 0.30:
        text += " " + random.choice(text_variants)

    # Occasionally introduce irregular whitespace.
    if random.random() < 0.15:
        text = "  " + text + "  "

    return text


def generate_record(index):
    """Generate one record with 15 + 5 + 2 = 22 leaf attributes."""

    record = {
            # GENERAL: 15 attributes
            "id": index,
            "title": random.choice(titles),
            "category": random.choice(categories),
            "price": random_price(),
            "published_date": random_date(),
            "location": random.choice(locations),
            "url": f"https://picsum.photos/200/",
            "description": random_text(),
            "tags": random.sample(
                ["sale", "new", "popular", "eco", "premium",
                 "discount", "limited", "featured"],
                k=random.randint(1, 4)
                ),

            # ADDITIONAL INFO: 7 attributes
            "additional_info": {
                "item_id": f"ITEM-{index:05d}",
                "brand": random.choice(brands),
                "sku": f"SKU-{random.randint(100000, 999999)}",
                "condition": random.choice([
                    "New", "Used", "Refurbished", None
                    ]),
                "availability": random.choice([
                    "In stock", "Out of stock", "Limited availability",
                    "Available", "Unavailable", None
                    ]),
                "seller": random.choice(sellers),
                "rating": (
                    round(random.uniform(1, 5), 1)
                    if random.random() > 0.10 else None
                    ),
                },
            # READ MORE: 5 attributes
            "read_more": {
                "summary": random_text(),
                "full_text": random_text() + " " + random_text(),
                "author": random.choice([
                    "Editorial Team", "John Smith",
                    "Guest Author", "Product Team", None
                    ]),
                "published_date": random_date(),
                "source_url": (
                    f"/posts/{index}"
                    )
                },

            # INTERACTION: 2 attributes
            "interaction": {
                "likes": random.randint(0, 50000),
                "comments_count": random.randint(0, 2500)
                }
    }

    return record


def main():
    data = [
            generate_record(index)
            for index in range(1, NUM_ROWS + 1)
            ]

    output_path = Path(OUTPUT_FILE)

    with output_path.open("w", encoding="utf-8") as file:
        json.dump(
                data,
                file,
                ensure_ascii=False,
                indent=2
                )

    print(f"Generated {len(data)} records.")
    print(f"Saved to: {output_path.resolve()}")

    # Validate the generated file and attribute counts.
    with output_path.open("r", encoding="utf-8") as file:
        loaded_data = json.load(file)

    assert len(loaded_data) == NUM_ROWS

    print("Done.")


if __name__ == "__main__":
    main()
