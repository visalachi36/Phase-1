import inquirer from 'inquirer';
import { handleEncrypt } from './encrypt.js'; // Ensure 'encrypt.js' has 'handleEncrypt'
import { handleDecrypt } from './decrypt.js'; // Ensure 'decrypt.js' has 'handleDecrypt'

async function main() {
  // Prompt user for the action (encrypt or decrypt)
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: '🔐 What would you like to do?',
      choices: ['Encrypt a file', 'Decrypt a file']
    }
  ]);

  // Prompt user for the file path
  const { filePath } = await inquirer.prompt([
    {
      type: 'input',
      name: 'filePath',
      message: '📂 Enter the path to the file:'
    }
  ]);

  // Prompt user for the password
  const { password } = await inquirer.prompt([
    {
      type: 'password',
      name: 'password',
      message: '🔑 Enter the password:',
      mask: '*'
    }
  ]);

  // Based on the action, either encrypt or decrypt the file
  if (action === 'Encrypt a file') {
    handleEncrypt(filePath, password);
  } else {
    handleDecrypt(filePath, password);
  }
}

// Run the main function
main();
