const RESUME_URL = "/resume.pdf";
const RESUME_FILE_NAME = "김소진_CS_CX_이력서.pdf";

export async function downloadResume() {
    const response = await fetch(RESUME_URL);

    if (!response.ok) {
        window.location.href = RESUME_URL;
        return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = RESUME_FILE_NAME;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}

