import { useState, type MouseEvent } from 'react';
import { Tooltip } from '@mui/material';
import { displayPackageName, packageDetails } from '@/utils/packageNames';

/**
 * Shows the friendly package name; double-click switches to the raw package
 * code and back.
 */
export function PackageName({ code, suffix = '', tip }: { code: string; suffix?: string; tip?: string }) {
  const [raw, setRaw] = useState(false);
  const details = packageDetails(code);
  const toggle = (e: MouseEvent) => {
    e.stopPropagation();
    setRaw((r) => !r);
  };
  const text = (
    <span onDoubleClick={toggle} style={{ cursor: details ? 'help' : undefined }}>
      {displayPackageName(code, raw)}
      {suffix}
    </span>
  );
  const title = [tip, details && `${details} (double-click to switch name/code)`].filter(Boolean).join(' — ');
  return title ? <Tooltip title={title}>{text}</Tooltip> : text;
}
