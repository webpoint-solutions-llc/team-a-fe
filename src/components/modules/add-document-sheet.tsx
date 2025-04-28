import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import AddDocumentForm from "./add-document-form";

interface AddDocumentDrawerProps {
  categoryId: string;
  open: boolean;
  onOpenChange: (state: boolean) => void;
}
export default function AddDocumentDrawer(props: AddDocumentDrawerProps) {
  return (
    <>
      <Drawer isOpen={props.open} onOpenChange={props.onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Drawer Title
              </DrawerHeader>
              <DrawerBody>
                <AddDocumentForm />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
