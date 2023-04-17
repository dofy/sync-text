import { Azeret_Mono } from "next/font/google";

interface IPageBoxProps {
  children: React.ReactNode
}

const font = Azeret_Mono({
  subsets: ['latin'],
})

const PageBox: React.FC<IPageBoxProps> = ({ children }) => {
  return (
    <main className={`${font.className} flex flex-col min-h-screen items-center justify-between p-2 sm:p-12 mx-auto max-w-3xl`}>
      {children}
    </main>
  )
}

export default PageBox;