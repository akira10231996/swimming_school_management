import { Avatar, TableContainer } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/student/list/studentListActions';
import Checkbox from '@mui/material/Checkbox';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import Roles from 'src/security/roles';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/student/list/studentListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import studentSelectors from 'src/modules/student/studentSelectors';
import StudentStatusView from 'src/view/student/view/StudentStatusView';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';

function RegistrationTable() {
  const dispatch = useDispatch();
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );

  console.log(rows);
  const hasPermissionToEdit = useSelector(
    studentSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    studentSelectors.selectPermissionToDestroy,
  );

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(actions.doDestroy(id));
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  const { sidenavColor } = selectMuiSettings();

  return (
    <>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell
                padding="checkbox"
                sorted={false}
                width="0"
              >
                {hasRows && (
                  <Checkbox
                    color={sidenavColor}
                    checked={Boolean(isAllSelected)}
                    onChange={() => doToggleAllSelected()}
                    size="small"
                  />
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('user.fields.avatars')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('fullName')}
                sorted={
                  sorter.field === 'fullName'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('user.fields.fullName')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('user.fields.class')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('user.fields.createdAt')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('user.fields.status')}
              </DataTableHeadCell>
            </TableRow>
          </MDBox>
          <TableBody>
            {loading && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <Spinner />
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading && !hasRows && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <MDTypography>
                    {i18n('table.noData')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <DataTableBodyCell padding="checkbox">
                    <Checkbox
                      color={sidenavColor}
                      checked={selectedKeys.includes(
                        row.id,
                      )}
                      onChange={() =>
                        doToggleOneSelected(row.id)
                      }
                      size="small"
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <MDBox
                      display="flex"
                      justifyContent="flex-end"
                    >
                      {hasPermissionToEdit &&
                      row.status === 'active' ? (
                        <Tooltip
                          disableInteractive
                          title={i18n('common.assignClass')}
                        >
                          <IconButton
                            size="small"
                            component={Link}
                            to={`/registration/${row.id}`}
                            color={sidenavColor}
                          >
                            <AssignmentTurnedInIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          disableInteractive
                          title={i18n(
                            'common.assignPayment',
                          )}
                        >
                          <IconButton
                            size="small"
                            component={Link}
                            to={`/payment/${row.id}/create`}
                            color={sidenavColor}
                          >
                            <PriceCheckIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {hasPermissionToDestroy && (
                        <Tooltip
                          disableInteractive
                          title={i18n('common.destroy')}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              setRecordIdToDestroy(row.id)
                            }
                            color={sidenavColor}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </MDBox>
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <Avatar
                      src={
                        row.avatars && row.avatars.length
                          ? row.avatars[0].downloadUrl
                          : undefined
                      }
                      alt={row.email}
                      sx={{
                        width: 32,
                        height: 32,
                      }}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.fullName}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.lessons[0]?.class.name}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {moment(row.createdAt).format(
                      DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                    )}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <StudentStatusView value={row.status} />
                  </DataTableBodyCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
        entriesPerPage
        showTotalEntries
      />

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default RegistrationTable;
