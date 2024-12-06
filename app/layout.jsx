import "./globals.css";

export const metadata = {
  title: "Electric library",
  description: "Projek dla biblioteki szkolnej",
};

export default function RootLayout({ children }) {
  return (
	<html lang="en">
		<body
			className={`antialiased`}
		>
			{children}
		</body>
	</html>
  );
}
