LiteCart

![logo LiteCart](https://github.com/user-attachments/assets/c2cfadf9-f26b-4803-936d-bda878fe96c7)

LiteCart is a lightweight, cloud-based system designed to streamline small business operations. With features like inventory management, a point-of-sale (POS) system, and a responsive dashboard, LiteCart helps you manage your shop efficiently on any device.

🚀 Features
Responsive Design: Seamlessly works on desktops, tablets, and smartphones.
Point of Sale (POS): Quickly add items, calculate totals, and generate printable invoices.
Inventory Management: Add, edit, and delete items in real-time with on-the-spot editing.
Dashboard: Monitor daily earnings and sales stats at a glance.
Cloud-Based: Access your system from anywhere, anytime.
🛠️ Technologies Used
Frontend: React, Tailwind CSS
Backend: Node.js, php
Database: MySQL (for inventory, invoices, and user data)
Deployment: Docker, Home Server Using nginx, Self Hosting on Cloudflare 🚀
🌐 Hosting LiteCart
LiteCart is proudly hosted on a personal home server, leveraging Docker and NGINX for efficient deployment. The system is accessible via a custom domain, showcasing the power of a lightweight, cloud-based infrastructure tailored to small business needs.
📂 Folder Structure
graphql
Copy code
src/
├── components/        # Reusable components (e.g., POS, InventoryTable)
├── pages/             # Full pages (e.g., Dashboard, Login)
├── styles/            # Tailwind CSS and global styles
├── utils/             # Helper functions (e.g., API integration)
└── App.js             # Main application component
📖 How to Run the Project
Prerequisites
Node.js and npm installed
MySQL server set up
Steps
Clone the Repository:
bash
Copy code
git clone https://github.com/your-username/LiteCart.git
cd LiteCart
Install Dependencies:
bash
Copy code
npm install
Set Up Tailwind CSS: Tailwind is preconfigured. Start editing styles in src/index.css.
Run the Development Server:
bash
Copy code
npm start
Access: Open your browser and navigate to http://localhost:3000.
💻 Screenshots
Dashboard
<In Devolopment>
POS Page
<In Devolopment>
Inventory Page
<In Devolopment>
🎨 Customization
You can modify the configuration in:

tailwind.config.js: Tailwind settings.
src/index.css: Global styles.
🌟 Contributions
We welcome contributions! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature-name).
Commit your changes (git commit -m 'Add a feature').
Push to the branch (git push origin feature-name).
Create a pull request.
📝 License
This project is licensed under the MIT License. See the LICENSE file for details.
