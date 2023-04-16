import { QRCodeSVG } from "qrcode.react";

interface IQRCodeProps {
  value: string;
  size?: 'small' | 'medium' | 'large';
}

const QRCode: React.FC<IQRCodeProps> = ({ value, size = 'small' }) => {
  const codePadding = {
    small: 'p-1',
    medium: 'p-2',
    large: 'p-4',
  }[size]
  const codeSize = {
    small: 128,
    medium: 256,
    large: 512,
  }[size]
  const logoSize = {
    small: 24,
    medium: 48,
    large: 96,
  }[size]
  return (<QRCodeSVG
    className={`bg-white ${codePadding}`}
    size={codeSize}
    value={value}
    level="L"
    includeMargin={false}
    imageSettings={{
      src: "/logo.png",
      height: logoSize,
      width: logoSize,
      excavate: true,
    }} />)
}

export default QRCode;
