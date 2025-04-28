import AddDocumentForm from "./add-document-form";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/react";

interface AddDocumentDrawerProps {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  projectId: string;
}
export default function AddDocumentDrawer(props: AddDocumentDrawerProps) {
  return (
    <>
      <Drawer isOpen={props.open} onOpenChange={props.onOpenChange}>
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Add Document
              </DrawerHeader>
              <DrawerBody>
                <AddDocumentForm
                  onAddSuccess={() => {
                    props.onOpenChange?.(false);
                  }}
                  projectId={props?.projectId}
                />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
