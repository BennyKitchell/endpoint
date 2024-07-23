# Endpoint Takehome

## Getting Started

This is a single page application that takes in a list of specific commands and manipulates a folder directory.

### Prerequisites

Some Examples of potential commands
* 
  ```sh
  CREATE fruits
  CREATE grains
  CREATE fruits/apples
  LIST
  DELETE grains
  LIST
  ```

### Installation and Usage


1. Clone the repo
   ```sh
   git clone https://github.com/BennyKitchell/endpoint.git
   ```
2. Install NPM packages for both the client and server
   ```sh
   cd app/server 
   npm i
   cd ../client
   npm i
   ```
3. Run the server
```
    cd app/server
    npm run build
    npm run start
```
4. Run the client (in another window)
```
    cd app/client
    npm run dev
```
5. Navigate to http://localhost:5174/ on your browser (Chrome is recommended)
6. Upload your instructions and click the Upload button at the bottom

## Further Considerations
<ul>
  <li>Add JWT tokens for authentication to help block potential vulnerabilities</li>
  <li>Containerize both server and client</li>
  <li>Add logs and tracing to find painpoints for debugging</li>
  <li>Allow multiple file uploads</li>
</ul> 


<p align="right">(<a href="#readme-top">back to top</a>)</p>