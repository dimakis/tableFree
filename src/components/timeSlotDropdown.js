import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 500,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const times = [
  '12-1',
  '1-2',
  '3-4',
  '4-5',
  '5-6',
  '6-7',
  '7-8',
  '8-9',
  '9-10',
];

function getStyles(time, tableId, theme) {
  return {
    fontWeight:
      tableId.indexOf(time) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [tableId, setTableId] = React.useState([]);

  const handleChange = (event) => {
    setTableId(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setTableId(value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Select</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={tableId}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {times.map((time) => (
            <MenuItem key={time} value={time}>
              <Checkbox checked={tableId.indexOf(time) > -1} />
              <ListItemText primary={time} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="select-multiple-native">
          Selected:
        </InputLabel>
        <Select
          multiple
          native
          value={tableId}
          onChange={handleChangeMultiple}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
