import MultyUploadFile from '../../components/Admin/MultyUploadFile/MultyUploadFile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["header", "home"]))
      }
    }
  }
export default function CreatePost() {
    return (
        <>
            <MultyUploadFile />
        </>
    )
}