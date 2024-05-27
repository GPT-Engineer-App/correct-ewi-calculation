import React, { useState } from "react";
import { Container, Text, VStack, Input, Button } from "@chakra-ui/react";

const calculateEWI = (F8, F5, C2) => {
  const PMT = (rate, nper, pv) => {
    if (rate === 0) return -(pv / nper);
    const pvif = Math.pow(1 + rate, nper);
    return (rate * pv * pvif) / (pvif - 1);
  };

  const weeklyRate = F8 / 52;
  const pmtValue = PMT(weeklyRate, F5, -C2);
  const additionalAmount = (7 * C2 * F8) / 365 / F5;

  return pmtValue + additionalAmount;
};

const Index = () => {
  const [F8, setF8] = useState(0);
  const [F5, setF5] = useState(0);
  const [C2, setC2] = useState(0);
  const [ewi, setEwi] = useState(null);

  const handleCalculate = () => {
    const result = calculateEWI(F8, F5, C2);
    setEwi(result.toFixed(2));
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">EWI Calculator</Text>
        <Input placeholder="Enter F8" value={F8} onChange={(e) => setF8(parseFloat(e.target.value))} />
        <Input placeholder="Enter F5" value={F5} onChange={(e) => setF5(parseFloat(e.target.value))} />
        <Input placeholder="Enter C2" value={C2} onChange={(e) => setC2(parseFloat(e.target.value))} />
        <Button onClick={handleCalculate}>Calculate EWI</Button>
        {ewi !== null && <Text>EWI Amount: {ewi}</Text>}
      </VStack>
    </Container>
  );
};

export default Index;
