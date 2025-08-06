import PyPDF2

def extract_pdf_text(pdf_path, output_path):
    try:
        with open(pdf_path, 'rb') as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            
            with open(output_path, 'w', encoding='utf-8') as output_file:
                output_file.write(text)
            
            print(f"Text extracted and saved to {output_path}")
            return text
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    pdf_path = "Hari Hara Sundaram S(Resume).pdf"
    output_path = "resume_text.txt"
    text = extract_pdf_text(pdf_path, output_path)
    if text:
        print("First 500 characters:")
        print(text[:500]) 