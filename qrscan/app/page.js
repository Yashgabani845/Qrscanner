"use client";
import { useRouter } from "next/navigation";
import BarcodeScanner from "./barcode/page";
import QRScanner from "./scan/page";
export default function ScanPage() {
  
return <QRScanner />;
}
