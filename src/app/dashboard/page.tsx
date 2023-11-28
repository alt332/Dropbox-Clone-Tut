import Dropzone from "@/components/Dropzone";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { FileType } from "../../../types";
import TableWrapper from "@/components/table/TableWrapper";

async function Dashboard() {
  const { userId } = auth();

  const docsResults = await getDocs(collection(db, `users`, userId!, "files"));
  const skeletonFiles: FileType[] = docsResults.docs.map((doc) => {
    const { fileName, fullName, downloadUrl, type, size } = doc.data();
    return {
      id: doc.id,
      fileName: fileName || doc.id,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      fullName,
      downloadUrl,
      type,
      size,
    };
  });

  return (
    <div className="border-t">
      <Dropzone />

      <section className="container space-y-5">
        <h2>All Files</h2>

        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
