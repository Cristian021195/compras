import React from 'react'
import { useState } from 'react';

export const useFormAnimation = (val:boolean) => {
  const [minimize, setMinimize] = useState(val);
  return {
    minimize, setMinimize
  }
}
