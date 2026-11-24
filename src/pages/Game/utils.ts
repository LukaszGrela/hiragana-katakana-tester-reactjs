import { TSelection, TSyllabarySeries } from "../../store/types";

/**
 * `selection` może zawierać `"all"` — rozwijamy je do listy ID z `data`
 * (dawniej robił to `mapStateToProps` w `connect()`).
 */
export const resolveSelection = (
  selection: TSelection,
  data: TSyllabarySeries,
): number[] => {
  if (selection && selection.length === 1 && isNaN(Number(selection[0]))) {
    //'all' - convert to list of ID's
    return data.map((item) => item.id);
  }

  return selection as number[];
};
