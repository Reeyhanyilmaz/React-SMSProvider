import { useRef } from "react";
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input,
  ModalCloseButton, useDisclosure, Button, Select} from "@chakra-ui/react";
  import {useSelector, useDispatch} from 'react-redux';

function ModalComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const providerEnums = useSelector((state) => state.provider.providerEnums);
  const shiftEnums = providerEnums.filter(item => item.value !== 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
   console.log('e.target', e.target);

  }

  return (   
    <>
      <Button onClick={onOpen} colorScheme="teal">Add New Provider</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>       
              <FormControl isRequired mb="2">
              <FormLabel>Provider</FormLabel>
              <Select>
                {shiftEnums.map((item, i) => (
                <option key={i} value={item.value} >{item.name}</option>
                ))}
              </Select>
              </FormControl>
             
               <FormControl isRequired>
              <FormLabel>PartnerID</FormLabel>
               <Input size="sm"  type="number" ref={initialRef} placeholder='PartnerID'  />
            </FormControl>

               <FormControl isRequired>
              <FormLabel>BaseURL</FormLabel>
               <Input size="sm" type="text"  placeholder='BaseURL' />
            </FormControl>

               <FormControl isRequired mt={4}>
              <FormLabel>FromName</FormLabel>
               <Input size="sm" placeholder='FromName' />
            </FormControl>

              <FormControl isRequired mt={4}>
              <FormLabel>Username</FormLabel>
               <Input size="sm" placeholder='Username' />
            </FormControl>

               <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
               <Input size="sm" type="password" placeholder='Password' />
            </FormControl>


               <FormControl isRequired mt={4}>
              <FormLabel>VendorCode</FormLabel>
               <Input size="sm" placeholder='VendorCode' />
            </FormControl>

               <FormControl isRequired mt={4}>
              <FormLabel>ApiKey</FormLabel>
               <Input size="sm" placeholder='ApiKey' />
            </FormControl>

               <FormControl isRequired mt={4}>
              <FormLabel>SecretKey</FormLabel>
               <Input size="sm" placeholder='SecretKey' />
            </FormControl>

               <FormControl isRequired mt={4}>
              <FormLabel>AccountSID</FormLabel>
               <Input size="sm" placeholder='AccountSID' />
            </FormControl>

               <FormControl isRequired mt={4}>
              <FormLabel>AuthToken</FormLabel>
               <Input size="sm" placeholder='AuthToken' />
            </FormControl>  
                 
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} type="submit" >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form> 
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalComponent;