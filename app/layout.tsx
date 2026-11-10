import type { Metadata, Viewport } from "next";
import { Anton, Caveat_Brush, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const caveat = Caveat_Brush({ subsets: ["latin"], weight: "400", variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  title: "Muhammed Abdulla K | Cloud & DevOps Engineer in training",
  description: "Portfolio of Muhammed Abdulla K: ECE graduate moving into Cloud and DevOps, with Jenkins, AWS EC2, GitHub Actions, ROS and IoT projects.",
};
export const viewport: Viewport = { themeColor: "#09090b", width: "device-width", initialScale: 1 };

const preBuild = `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search).get('agents'),s=null;try{s=localStorage.getItem('agents')}catch(e){}var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;var on=q==='on'?true:q==='off'?false:s==='off'?false:s==='on'?true:!rm;if(on)d.classList.add('build-mode')}catch(e){document.documentElement.classList.add('build-mode')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${anton.variable} ${geist.variable} ${geistMono.variable} ${caveat.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preBuild }} />
        <noscript><style>{`[data-build]{visibility:visible!important}#boot{display:none!important}`}</style></noscript>
      </head>
      <body>
        <div id="boot" aria-hidden="true">
          <div className="boot-inner">
            <span>Booting build agents</span>
            <span className="boot-bar"><i /></span>
            <span>Reading layout, loading type, warming up cursors</span>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
