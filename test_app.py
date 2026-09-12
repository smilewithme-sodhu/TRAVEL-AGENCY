from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:5173")
    page.wait_for_timeout(2000)

    # Let's try to click on something that might be a login button based on the text.
    # We will log the elements
    print("Buttons:")
    for button in page.get_by_role("button").all():
        print("  -", button.inner_text())

    print("Links:")
    for link in page.get_by_role("link").all():
        print("  -", link.inner_text())

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 1280, 'height': 720}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
