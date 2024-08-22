"use client";

import { TR, TDT, TA, TD } from "../../components";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Share } from "lucide-react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function TableRow(props) {
  const { doc, refetchDocs } = props;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    getMembers();
  }, []);

  const [members, setMembers] = useState([]);

  const handleCancel = () => {
    refetchDocs();
  };

  async function getMembers() {
    try {
      let res = await axios.get("/api/users");
      const { data } = res;

      setMembers(data?.docs);
    } catch (error) {
      console.log(error);
    }
  }

  const handleApprove = async () => {
    let res = await axios.put("/api/expenses/approve");
    refetchDocs();
  };

  const items = [
    <div className="w-full mx-auto flex items-center justify-between">
      <p className="text-center flex gap-2" onClick={onOpen}>
        <Share className="text-blue-500 text-xl text-center" />
        <span>Approve</span>
      </p>
    </div>,
    <div
      onClick={() => {}}
      className="w-full mx-auto flex items-center justify-between"
    >
      <p className="text-center flex gap-2">
        <RiDeleteBin5Line className="text-red text-xl text-center" />
        <span className="text-red">Delete</span>
      </p>
    </div>,
  ];

  return (
    <>
      <TR>
        <TDT name="#" txt={doc?.id || "-"} />
        <TDT name="EXPENSE NAME" txt={doc?.name || "-"} />
        <TDT name="AMOUNT" txt={doc?.amount || ""} />
        <TDT name="APPROVED BY" txt={doc?.members?.name || "--"} />
        <TDT name="STATUS" txt={doc?.status || "--"} />

        <TD>
          <TA name="Action" id={doc?.id} dropdownItems={items} />
        </TD>
      </TR>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Approve Expense
              </ModalHeader>
              <ModalBody>
                <div className="w-full p-5">
                  <select className="p-2 rounded-lg">
                    <option value="">Select user</option>
                    {members?.map((member, i) => (
                      <option key={i} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleApprove}>
                  Approve
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default TableRow;
