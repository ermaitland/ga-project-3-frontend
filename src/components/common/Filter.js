import { useState, useEffect } from 'react';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function Filter({
  pulledOptions,
  labelText,
  placeholderText,
  value,
  onChange
}) {
  return (
    <Autocomplete
      // value={value}
      multiple
      id='checkboxes-tags-demo'
      options={pulledOptions}
      onChange={onChange}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.name}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={labelText}
          placeholder={placeholderText}
        />
      )}
    />
  );
}
