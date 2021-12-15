import { TdHTMLAttributes } from 'react'
import styled from 'styled-components'

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  variant?: 'td' | 'th'
}

const TableCellStyled = styled.td<TableCellProps>``

const TableCell = ({ children, variant, ...props }: TableCellProps) => (
  <TableCellStyled as={(variant as any) || 'td'} variant={variant || 'td'} {...props}>
    {children}
  </TableCellStyled>
)

export default TableCell
