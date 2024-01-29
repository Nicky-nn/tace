import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  OutlinedInput,
  Popover,
  Typography,
} from '@mui/material';
import { HelpOutline as HelpOutlineIcon } from '@mui/icons-material';
import InputNumber from 'rc-input-number';
import { useEffect, useRef, useState } from 'react';

import { numberWithCommas } from '../../../../../base/components/MyInputs/NumberInput';
import { NumeroMask } from '../../../../../base/components/MyInputs/NumeroMask';
import useAuth from '../../../../../base/hooks/useAuth';
import { pFloat } from '../../../../../utils/pFloat';

export interface SimpleDialogProps {
  id: string;
  keepMounted: boolean;
  value: number;
  open: boolean;
  onClose: (value?: number) => void;
}

export const GiftCardDialog = (props: SimpleDialogProps) => {
  const {
    user: { monedaTienda },
  } = useAuth();
  const { onClose, keepMounted, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const inputRef = useRef<HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleEntering = () => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  };

  const handleHelpIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? 'help-popover' : undefined;

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      keepMounted={keepMounted}
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Ingrese Monto Gift-Card ({monedaTienda.descripcion})</DialogTitle>
      <DialogContent dividers>
        <Grid container>
          <Grid item lg={12}>
            <OutlinedInput
              size="small"
              value={value.toString()}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                const cantidad = pFloat(e.target.value);
                setValue(cantidad);
              }}
              inputComponent={NumeroMask as any}
              inputProps={{}}
            />
            <Typography variant="subtitle1" sx={{ ml: 1 }} component="small">
              {monedaTienda.sigla || ''}
            </Typography>

            {/* Icono de ayuda */}
            <IconButton
              aria-describedby={popoverId}
              onClick={handleHelpIconClick}
              size="small"
              style={{ marginLeft: 5 }}
            >
              <HelpOutlineIcon />
            </IconButton>

            {/* Popover de ayuda */}
            <Popover
              id={popoverId}
              open={openPopover}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>
                El monto de la Gift-Card solo se enviará si el MÉTODO DE PAGO es 27. - Gift-Card
              </Typography>
            </Popover>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancelar
        </Button>
        <Button onClick={handleOk} style={{ marginRight: 10 }}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
