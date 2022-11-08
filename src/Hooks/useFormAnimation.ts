import React from 'react'
import { useState } from 'react';

export const useFormAnimation = () => {
  const [minimize, setMinimize] = useState(false);
  return {
    minimize, setMinimize
  }
}
