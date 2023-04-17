import Footer from "@/components/Footer";
import QRCode from "@/components/QRCode";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Azeret_Mono } from "next/font/google";
import { useEffect, useState } from "react";

const font = Azeret_Mono({
  weight: "200",
  subsets: ["latin"],
})

const pullText = async (uuid: string): Promise<SyncData> => {
  const res = await axios.get<SyncData>(`/api/sync/${uuid}`)
  return res.data
}

const pushText = async (uuid: string, content: string): Promise<SyncData> => {
  const res = await axios.post<SyncData>(`/api/sync/${uuid}`, { content })
  return res.data
}

const Page: React.FC<IPageProps> = ({ title, uuid }) => {
  const [origin, setOrigin] = useState<string>('')
  const [domain, setDomain] = useState<string>('')
  const [data, setData] = useState<SyncData>({ uuid: '', content: '' })

  useEffect(() => {
    const { origin, hostname } = window.location
    setOrigin(origin)
    setDomain(hostname)
    pullText(uuid).then((data) => setData(data))
  }, [uuid])

  return (
    <main className={`${font.className} flex flex-col min-h-screen items-center justify-between p-24`}>
      <div className="text-xl my-1 underline underline-offset-4">{title}</div>
      <div>
        <QRCode size="small" value={`${origin}/${uuid}`} />
      </div>
      <div className="flex-grow">
        ID: {uuid}
        <textarea className="p-2 w-full" />
        {data.uuid}, {data.content}
        <button onClick={() => pushText(uuid, 'test')}>Push</button>
      </div>
      <Footer domain={domain} origin={origin} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      uuid: query.uuid,
      title: process.env.TITLE,
    }
  }
}

export default Page