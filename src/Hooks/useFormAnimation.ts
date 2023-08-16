import React from 'react'
import { useState } from 'react';

export const useFormAnimation = () => {
  const [minimize, setMinimize] = useState(true);
  return {
    minimize, setMinimize
  }
}
