# Cast-A-Pod: Podcast Episode Generator

Welcome to **Cast-A-Pod**, a podcast episode generator that uses Google's Gemini AI to generate podcast scripts based on your topic and preferences. Simply fill out the form and click "Generate" to get started!

## Features

- **Generate Podcast Scripts**: Create podcast scripts with an introduction, main content, and conclusion.
- **Text-to-Speech**: Listen to the generated script using the built-in text-to-speech functionality.
- **Dynamic Content**: Customize the title, description, number of commentators, and length of the podcast.
- **Responsive Design**: Enjoy a polished and professional user interface that works on all devices.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/podcast-generator.git
   cd podcast-generator
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```sh
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```sh
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Usage

1. **Fill Out the Form**: Enter the title, description, number of commentators, and length of the podcast.
2. **Generate Script**: Click the "Generate" button to create a podcast script.
3. **Listen to the Script**: Use the "Play Audio" button to listen to the generated script. You can pause, resume, or stop the audio as needed.

## Project Structure

```
podcast-generator/
├── backend/
│   ├── server.js
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Container.jsx
│   │   │   ├── Form.jsx
│   │   │   ├── Response.jsx
│   │   │   └── ...
│   │   ├── App.js
│   │   └── index.js
│   └── ...
├── README.md
└── package.json
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Google's Gemini AI](https://ai.google/) for providing the AI capabilities.
- [React](https://reactjs.org/) for the frontend framework.
- [Node.js](https://nodejs.org/) for the backend server.

## Contact

If you have any questions or feedback, please feel free to reach out to us at llamouth@pursuit.org.

Happy podcasting!
