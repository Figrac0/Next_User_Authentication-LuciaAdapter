import "./globals.css";

export const metadata = {
    title: "Elevate Fitness | Premium Training Platform",
    description: "Next-generation fitness and wellness platform",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
