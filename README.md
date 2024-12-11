
# LiteCart
<h1  align="center">
<a href="https://pos.decryptic.online/"><img  src="https://github.com/user-attachments/assets/62ecef3a-dabd-43e7-a5df-acebe6d7ed46" width="250" height="250"></a>
</h1>

**LiteCart** is a lightweight, cloud-based system designed to streamline small business operations. With features like inventory management, a point-of-sale (POS) system, and a responsive dashboard, LiteCart helps you manage your shop efficiently on any device.



## Build Instructions

To build and run the **LiteCart** project locally, follow these steps:

### Prerequisites
Before proceeding, ensure you have the following installed on your system:
- **Node.js**: [Download and install Node.js](https://nodejs.org/) (LTS version recommended).
- **npm**: Comes with Node.js. Alternatively, you can use **yarn** if preferred.
- **Git**: [Download and install Git](https://git-scm.com/).

### Steps to Build the Project
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Kaywere/LiteCart.git
   cd LiteCart
2. **Install Dependencies**: Run the following command to install the required dependencies:
   ```bash
   npm install
3. **Start the Development Server**: To run the project locally:
   ```bash
   npm run dev
  -  The development server will start, and you can view the app in your browser at:
     ```bash
	 `http://localhost:5173`
4. **Build for Production**: To create a production-ready build of the project:
   ```bash
   npm run build
  - The output will be generated in the `dist` directory.
  
5. **Preview the Production Build**: You can preview the built project locally using:
   ```bash
   `npm run preview`

### Deployment

To deploy the production build, you can upload the contents of the `dist` directory to any static hosting platform such as:

-   **GitHub Pages**
-   **Self Hosting**
-   **Netlify**
## 🚀 Features
- **Point of Sale (POS)**: Quickly add items, calculate totals, and generate printable invoices.
- **Inventory Management**: Add, edit, and delete items in real-time with on-the-spot editing.
- **Dashboard**: Monitor daily earnings and sales stats at a glance.
- **Cloud-Based**: Access your system from anywhere, anytime.



## 🛠️ Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, PHP
- **Database**: MySQL (for inventory, invoices, and user data)
- **Deployment**: Docker, Home Server Using NGINX, Self Hosting on Cloudflare 🚀


## 🌐 Hosting LiteCart
LiteCart is proudly hosted on a personal home server, leveraging Docker and NGINX for efficient deployment. The system is accessible via a custom domain, showcasing the power of a lightweight, cloud-based infrastructure tailored to small business needs.




## 💻 Screenshots
**Dashboard**

<img src="https://github.com/user-attachments/assets/d0991ea2-4e22-4288-89da-b4b5f54259d2" alt="Dashboard Screenshot" width="350" height="250">    <img src="https://github.com/user-attachments/assets/9086f963-ca95-4961-8a90-4a2b72ebcb76" alt="Dashboard Screenshot" width="350" height="250">

**POS Page**

<img src="https://github.com/user-attachments/assets/46c89cf5-9a82-4f74-9608-f1bab9c46a16" alt="Dashboard Screenshot" width="350" height="250">    <img src="https://github.com/user-attachments/assets/ea1e0e57-0ad5-4e49-99fd-03d643d4632f" alt="Dashboard Screenshot" width="350" height="250">

<img src="https://github.com/user-attachments/assets/a4b67c89-d6a5-4740-968b-c8214318b849" alt="Dashboard Screenshot" width="350" height="250">    <img src="https://github.com/user-attachments/assets/f76398fe-ec3b-48ff-9945-f99a8e98dfbe" alt="Dashboard Screenshot" width="350" height="250">

**Inventory Page**

<img src="https://github.com/user-attachments/assets/123b7cbc-3229-4d03-a7c3-b78424b01820" alt="Dashboard Screenshot" width="350" height="250">    <img src="https://github.com/user-attachments/assets/5744070c-9872-466c-b34c-ed86feb34283" alt="Dashboard Screenshot" width="350" height="250">






## 🎨 Customization

You can modify the configuration in:

- **`tailwind.config.js`**: Tailwind settings.
- **`src/index.css`**: Global styles.





## 🌟 Contributions
We welcome contributions! To contribute:

1. **Fork the repository**:
   [https://github.com/kaywere/LiteCart](https://github.com/kaywere/LiteCart)

2. **Create a feature branch**:
   ```bash
   git checkout -b feature-name
   
3. **Commit your changes**:
   ```bash
   git commit -m "Add a feature"
   
4. **Push to the branch**:
   ```bash
   git push origin feature-name
   
5. **Create a pull request**.

  - Go to the original repository.
  - Click on the Pull Requests tab.
  - Click New Pull Request and submit your changes.

---


## 📝 License 

This project is licensed under the MIT License. See the <a href="https://github.com/Kaywere/LiteCart/blob/8f42202cc305e257368adb528802828a20a3558a/LICENSE" width="250" height="250">LICENSE</a> file for details.
