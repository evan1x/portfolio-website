document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("P-NqodeCsWR1RRwo0"); // Initialize EmailJS

    document.querySelector('.contact-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect form data
        const name = this.querySelector('[name="name"]').value;
        const email = this.querySelector('[name="email"]').value;
        const message = this.querySelector('[name="message"]').value;

        console.log("Collected Data:", { name, email, message });

        const emailData = {
            to_name: "Evan Nickason",
            name: name,
            email: email,
            message: message,
        };

        console.log("Prepared Email Data:", emailData);

        emailjs
            .send("service_19812id", "template_j6dcqls", emailData)
            .then(() => {
                alert("Message sent successfully!");
                this.reset();
            })
            .catch((error) => {
                console.error("Error Sending Email:", error);
                alert("Failed to send the message. Please try again later.");
            });
    });
});
