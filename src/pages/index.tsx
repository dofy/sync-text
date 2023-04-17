import Footer from "@/components/Footer";
import QRCode from "@/components/QRCode";
import { Azeret_Mono } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const font = Azeret_Mono({
  weight: '200',
  subsets: ['latin'],
})

const Page: React.FC<IPageProps> = ({ title, uuid }) => {
  const [origin, setOrigin] = useState<string>('')
  const [domain, setDomain] = useState<string>('')

  useEffect(() => {
    const { origin, hostname } = window.location
    setOrigin(origin)
    setDomain(hostname)
  }, [])

  return (
    <main className={`${font.className} flex min-h-screen flex-col items-center justify-between p-24`}>
      <div className="text-3xl my-3 underline underline-offset-8">{title}</div>
      <div>
        <QRCode size="medium" value={origin} />
      </div>
      <div className="text-xl flex-grow self-center">
        <Link href={`/create/${uuid}`}> Enter &gt;&gt; </Link>
      </div>
      <Footer domain={domain} origin={origin} />
    </main>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      title: process.env.TITLE,
      uuid: uuidv4()
    }
  }
}

export default Page