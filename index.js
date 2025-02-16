import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([  //Pass your questions in here 
    {
        type: "input",
        name: "url",
        message: "Enter the URL for the QR code",
        validate: (input) => (input ? true : 'Input cannot be empty!')
    }
  ])
  .then((answers) => { 
     // Extract user input
    const url = answers.url;    

    // Generate QR code image
    const qr_png = qr.image(url, { type:'png' });
   
    // Define output file path
    const filePath = "qrcode.png";

    // Save the image to a file
    qr_png.pipe(fs.createWriteStream(filePath));
    console.log(`✅ QR Code generated successfully! Check the file: ${filePath}`)

    // Generate txt file
    fs.writeFile("URL.txt", url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    })

  })

  .catch((error) => {
    if (error.isTtyError) {
        console.error("❌ Error: The prompt could not be rendered in the current terminal.")

    } else {
        console.error("❌ Something went wrong: ", error);
    }
  });