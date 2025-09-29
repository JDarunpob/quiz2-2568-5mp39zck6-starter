import { useState } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
  Group,
} from "@mantine/core";

// 🚨 แก้ไข: จำกัด categories ให้เหลือเพียง 3 หมวดหมู่ตามที่ต้องการ
const expenseCategories = [
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "entertainment", label: "Entertainment" },
];

type AddExpenseModalProps = {
  opened: boolean;
  onClose: () => void;
  onAdd: (
    name: string, 
    amount: number,
    category: string
  ) => void;
};

export default function AddExpenseModal({
  opened,
  onClose,
  onAdd,
}: AddExpenseModalProps) {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined); 
  const [category, setCategory] = useState<string | null>(null);
  
  // State สำหรับจัดการข้อผิดพลาดในการตรวจสอบความถูกต้อง
  const [errors, setErrors] = useState({
    name: false,
    amount: false,
    category: false,
  });

  const resetForm = () => {
    setName("");
    setAmount(undefined);
    setCategory(null);
    setErrors({ name: false, amount: false, category: false }); // รีเซ็ตข้อผิดพลาด
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: false, amount: false, category: false };

    // Validation for Name
    if (name.trim() === "") {
      newErrors.name = true;
      isValid = false;
    }

    // Validation for Amount (must be a positive number)
    if (amount === undefined || amount <= 0) {
      newErrors.amount = true;
      isValid = false;
    }

    // Validation for Category
    if (category === null) {
      newErrors.category = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return; // หยุดถ้าฟอร์มไม่ผ่านการตรวจสอบ
    }

    // ฟอร์มถูกต้อง: ดำเนินการต่อ
    onAdd(name.trim(), amount as number, category as string);
    
    resetForm(); 
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        resetForm(); // Clear inputs and errors if closing without submitting
        onClose();
      }}
      title="Add Expense" 
      centered
    >
      <Stack spacing="md">
        <TextInput
          label="Expense Name *"
          placeholder="E.g., Coca-Cola"
          required
          value={name}
          onChange={(event) => {
            setName(event.currentTarget.value);
            setErrors((e) => ({ ...e, name: false })); 
          }}
          error={errors.name ? "Expense Name is required" : undefined} // แสดงข้อผิดพลาด
        />

        <NumberInput
          label="Amount *"
          placeholder="Amount"
          required
          min={0.01}
          precision={2}
          value={amount}
          onChange={(value) => {
            setAmount(value);
            setErrors((e) => ({ ...e, amount: false }));
          }}
          error={errors.amount ? "Amount is required" : undefined} // แสดงข้อผิดพลาด
        />

        <Select
          label="Category *"
          placeholder="Select Category"
          required
          data={expenseCategories} 
          value={category}
          onChange={(value) => {
            setCategory(value);
            setErrors((e) => ({ ...e, category: false }));
          }}
          error={errors.category ? "Category is required" : undefined} // แสดงข้อผิดพลาด
        />

        <Group position="center" mt="md"> 
          <Button 
            onClick={handleSubmit} 
            fullWidth
          >
            Submit
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}