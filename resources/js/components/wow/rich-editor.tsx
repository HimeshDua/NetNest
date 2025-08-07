'use client';

import { useState } from 'react';
import { Editor } from '../editor/editor';

export const Preview = () => {
    const [value, setValue] = useState('');

    return <Editor content={value} onChange={setValue} />;
};
