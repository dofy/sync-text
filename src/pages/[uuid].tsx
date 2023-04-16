import Footer from "@/components/Footer";
import QRCode from "@/components/QRCode";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Azeret_Mono } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Data = {
  oldid: string;
  newid: string;
}

interface IPageProps extends Data {
  title: string;
}

const font = Azeret_Mono({
  weight: "200",
  subsets: ["latin"],
})

const Page: React.FC<IPageProps> = ({ title, oldid, newid }) => {
  const router = useRouter()
  const { uuid } = router.query
  const [origin, setOrigin] = useState<string>('')
  const [domain, setDomain] = useState<string>('')

  useEffect(() => {
    const { origin, hostname } = window.location
    setOrigin(origin)
    setDomain(hostname)
  }, [])

  return (
    <main className={`${font.className} flex flex-col min-h-screen items-center justify-between p-24`}>
      <div className="text-xl my-1 underline underline-offset-4">{title}</div>
      <div>
        <QRCode size="small" value={`${origin}/${uuid}`} />
      </div>
      <div className="flex-grow">
        ID: {uuid}
        <textarea className=" h-full w-full" defaultValue={`${oldid}, ${newid}`} />
        {oldid}, {newid}
      </div>
      <Footer domain={domain} origin={origin} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uuid } = context.query;
  try {

    const res = await axios.get('/api/create', {
      params: {
        uuid
      }
    })

    const { newid, oldid } = res.data
    return {
      props: {
        newid,
        oldid,
        title: process.env.TITLE,
      }
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export default Page