import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:8000")
    page.wait_for_timeout(1000)

    # Scroll through key sections using exact nav links
    page.get_by_role("link", name="Perfil", exact=True).click()
    page.wait_for_timeout(800)

    page.get_by_role("link", name="Stack & Tech", exact=True).click()
    page.wait_for_timeout(800)

    page.get_by_role("link", name="Servicios", exact=True).click()
    page.wait_for_timeout(800)

    page.get_by_role("link", name="Proyectos", exact=True).click()
    page.wait_for_timeout(800)

    page.get_by_role("link", name="Agentes & MCP", exact=True).click()
    page.wait_for_timeout(800)

    page.get_by_role("link", name="Contacto", exact=True).click()
    page.wait_for_timeout(800)

    # Scroll back to top
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(800)

    # Take screenshot
    page.screenshot(path="/home/jules/verification/screenshots/landing_verification.png", full_page=True)
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1280, "height": 800},
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
