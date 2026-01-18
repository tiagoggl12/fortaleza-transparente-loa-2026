import os
from PyPDF2 import PdfReader


def debug_pdf():
    pdf_path = "/Users/tiago/Developer/fortaleza-transparente---ploa-2026/Arquivo completo LOA 2026/LOA-2026-numerado.pdf"
    reader = PdfReader(pdf_path)

    print(f"Total pages: {len(reader.pages)}")

    for i in range(min(10, len(reader.pages))):
        page = reader.pages[i]
        text = page.extract_text()
        print(f"\n--- Page {i + 1} ---")
        print(f"Text length: {len(text)}")
        print(f"First 100 chars: {repr(text[:100])}")
        if text.strip():
            print("✓ Has content")
        else:
            print("✗ Empty")


if __name__ == "__main__":
    debug_pdf()
