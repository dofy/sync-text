import Footer from "@/components/Footer";
import PageBox from "@/components/PageBox";
import QRCode from "@/components/QRCode";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";


const Page: React.FC<IPageProps> = ({ title, uuid }) => {
  const [origin, setOrigin] = useState<string>('')
  const [domain, setDomain] = useState<string>('')

  useEffect(() => {
    const { origin, hostname } = window.location
    setOrigin(origin)
    setDomain(hostname)
  }, [])

  return (
    <PageBox>
      <div className="text-4xl my-3 underline underline-offset-8">{title}</div>
      <QRCode size="medium" value={origin} />
      <div className="text-xl flex-grow self-center">
        <Link
          className="hover:underline p-4 block"
          href={`/sync/${uuid}`}> Enter &gt;&gt; </Link>
      </div>
      <Footer domain={domain} origin={origin} />
    </PageBox>
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