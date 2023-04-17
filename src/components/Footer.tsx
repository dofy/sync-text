import Link from "next/link";

interface IFooterProps {
  domain: string;
  origin: string;
}

const Footer: React.FC<IFooterProps> = ({ domain, origin }) => {
  const year = new Date().getFullYear()
  return (
    <div className="bg-gray-700 text-white text-center text-xs p-3 w-full">
      copyright &copy; {year} powered by Seven Yu & {` `}
        <Link className="text-white font-normal hover:underline" href={origin} >{domain}</Link>
    </div>
  )
}

export default Footer;