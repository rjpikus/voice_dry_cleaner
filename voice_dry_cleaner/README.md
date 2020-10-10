## {Features}
- Order Placing
- Text/Email Comm
- Pickup & Delivery
- Gen Info/Bus Hours
- FAQ, Capture Intent 
- Build Voice by Voice
- Geo-Loc. Store Finder
- Credit Card Transactions

## Getting Started
.
1. Install \newline
  1. Bitbucket account to download repository. (files are stored here)
  2. Git
  3. Jovo
  4 Javascript and some IDE +(atom,sublime,vscode)
  5. Jest
  6. node js
2. Download the repository from Gitlab using git command
3. Run jovo run in the terminal
4. Open a second terminal and locate the project dirctory.
5. Use npm test to run tests

If this error occurs when trying to pull from firestore:
Error: Failed to load gRPC binary module because it was not installed for the current system
Expected directory: node-v57-linux-x64-glibc

Run this command  npm rebuild grpc --target=8.1.0 --target_arch=x64 --target_platform=linux --target_libc=glibc
and create a new zip.

If that doesn't work, try:
1. delete bundle.zip
2. delete bundle/ folder
3. delete node modules folder
4. npm install grpc --target=8.1.0 --target_arch=x64 --target_platform=linux --target_libc=glibc
5. npm run bundle
6. Upload to AWS Lambda
