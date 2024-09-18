const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");
async function query() {
    image.src = "/loading1.gif"; // Show loading spinner
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
            {
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: JSON.stringify({ inputs: inputTxt.value }),
            }
        );
        if (response.ok) {
            const result = await response.blob();
            return result;
        } else {
            throw new Error("API request failed");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
button.addEventListener("click", async function () {
    query().then((response) => {
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL; 
    });
});
