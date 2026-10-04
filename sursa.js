// Get the enrollment form from the HTML
const form = document.getElementById("enrollementForm");

// Check if the enrollment form exists
if (form) {


  const key1024 = new JSEncrypt({ default_key_size: 1024 });
  key1024.getKey();

  const key3072 = new JSEncrypt({ default_key_size: 3072 });
  key3072.getKey();

  // Run this function when the enrollment form is submitted
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect the information entered by the user
    const data = {

      // Get and remove extra spaces from the full name
      fullName: document.getElementById("name").value.trim(),
      dateOfBirth: document.getElementById("birthdate").value.trim(),
      yearLevel: document.getElementById("year_level").value.trim(),
      gender: document.getElementById("gender").value.trim(),
      username: document.getElementById("username").value.trim(),
      password: document.getElementById("password").value.trim(),
    };

    // Check if any of the required fields are empty
    if (Object.values(data).some((v) => !v)) {
      alert("Please fill in all fields.");
      return;
    }

    // Convert the collected data into a readable JSON string
    const plainText = JSON.stringify(data, null, 2);

    // Select the data that will be encrypted using RSA
    const rsaText =`${data.fullName}|${data.username}|${data.password}`;
    const encrypted1024 = key1024.encrypt(rsaText);
    let decrypted1024 = null;

    // Check if the 1024-bit encryption was successful
    if (encrypted1024) {

      // Create a new RSA object for decryption
      const decrypt1024 = new JSEncrypt();

      // Set the private key for decryption
      decrypt1024.setPrivateKey(key1024.getPrivateKey()
      );

      // Decrypt the encrypted data
      decrypted1024 = decrypt1024.decrypt(encrypted1024);
    }

    // Encrypt the selected data using the 3072-bit RSA key
    const encrypted3072 = key3072.encrypt(rsaText);

    // Variable for storing the decrypted 3072-bit data
    let decrypted3072 = null;
    if (encrypted3072) {

      // Create a new RSA object for decryption
      const decrypt3072 = new JSEncrypt();

      // Set the private key for decryption
      decrypt3072.setPrivateKey(key3072.getPrivateKey()
      );

      // Decrypt the encrypted data
      decrypted3072 = decrypt3072.decrypt(encrypted3072);
    }

    // Display the original, encrypted, and decrypted results
    // in the output area of the webpage
    document.getElementById("output").textContent = `

Original Data:
${plainText}

1024-bit Encrypted:
${encrypted1024 || "Encryption Failed"}

1024-bit Decrypted:
${decrypted1024 || "Decryption Failed"}

3072-bit Encrypted:
${encrypted3072 || "Encryption Failed"}

3072-bit Decrypted:
${decrypted3072 || "Decryption Failed"}

`.trim();

  });
}