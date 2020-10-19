import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';

// function returns priority level string from number
export const priority = (num) => {
  const levels = [
    'Not specified',
    'Urgent',
    'Immediate',
    'Today',
    'Within a week',
    'When possible',
  ];
  return levels[num];
};

//   function to add line breaks to to array
export const insertBreak = (arr) => {
  return arr.reduce((result, element, index, array) => {
    result.push(element);
    if (index < array.length - 1) {
      result.push(<br key={index} />);
    }
    return result;
  }, []);
};

// function to generate list of fields workorder page

export const workOrderFieldGen = (workOrder) => {
  const {
    request_number,
    request_date,
    assigned_priority,
    request_email,
    submitted_by,
    building,
    floor,
    space,
    request_description,
    location_description,
    request_telephone,
    due_date,
    administrator_to_technician_comment,
  } = workOrder;

  let FIELDS = [];
  request_number &&
    FIELDS.push({ lable: 'Request Number:', detail: request_number });
  request_date &&
    FIELDS.push({
      lable: 'Request Date:',
      detail: dayjs(request_date).format('MM/DD/YYYY h:m A'),
    });
  assigned_priority &&
    FIELDS.push({
      lable: 'Priority:',
      detail: priority(assigned_priority),
      detailColor: assigned_priority === 1 && 'redDetail',
    });
  due_date &&
    FIELDS.push({
      lable: 'Due Date:',
      detail: dayjs(due_date).format('MM/DD/YYYY'),
      detailColor: 'redDetail',
    });

  request_email &&
    FIELDS.push({
      lable: 'Submited By:',
      detail: insertBreak([
        <a
          key={request_email}
          style={{ textDecoration: 'none' }}
          href={
            'mailto:' +
            request_email +
            `?subject=Workorder request for room ${space.number} in ${building.name}`
          }
        >{`${submitted_by} (${request_email})`}</a>,
        request_telephone && (
          <a
            key={request_telephone}
            style={{ textDecoration: 'none' }}
            href={'tel:' + request_telephone}
          >
            {request_telephone}
          </a>
        ),
      ]),
    });

  (building.number || building.name) &&
    FIELDS.push({
      lable: 'Location:',
      detail: [
        `${building.number} ${(building.number || building.name) && '- '}${
          building.name
        }`,
        <br key='1' />,
        floor && !!floor.name && floor.name,
        floor && !!floor.name && <br key='2' />,
        `${space && space.number && space.number} ${
          space && space.number && space.name && '- '
        }${space && space.name && space.name}`,
        location_description && <br key='3' />,
        location_description && location_description,
      ],
    });
  request_description &&
    FIELDS.push({
      lable: 'Request Description:',
      detail: insertBreak(request_description.split('\r\n')),
    });

  administrator_to_technician_comment &&
    FIELDS.push({
      lable: 'Administrator Comments:',
      detail: administrator_to_technician_comment,
    });

  return FIELDS;
};

// function to generate list of fields for component modal

export const componentDialogFieldGen = (component) => {
  const {
    // id,
    // name,
    instance_name,
    instance_description,
    barcode,
    serial_number,
    installation_date,
    warranty_start_date,
    space_name,
    space_number,
    floor_name,
    // floor_number,
    category,
    type_name,
    type_description,
    labour_warranty_duration,
    labour_warranty_guarantor,
    parts_warranty_guarantor,
    parts_warranty_duration,
    warranty_duration_unit,
    manufacturer,
    model_number,
    instance_attributes,
    type_attributes,
  } = component;
  // build fields array
  let FIELDS = [];
  type_name && FIELDS.push({ lable: 'Component Type:', detail: type_name });
  instance_name &&
    FIELDS.push({ lable: 'Unique mark:', detail: instance_name });
  category && FIELDS.push({ lable: 'Category:', detail: category });
  (space_name || space_number) &&
    FIELDS.push({
      lable: 'Location:',
      detail:
        (space_number && space_number) +
        (space_number && space_name && ' - ') +
        (space_name && space_name) +
        (floor_name && '\n') +
        (floor_name && floor_name),
    });

  if (instance_description && !type_description) {
    FIELDS.push({
      lable: 'Component description:',
      detail: instance_description,
    });
  }
  if (type_description && !instance_description) {
    FIELDS.push({ lable: 'Component description:', detail: type_description });
  }
  if (type_description && instance_description) {
    FIELDS.push({
      lable: 'Component description:',
      detail: `${type_description} \n ${instance_description}`,
    });
  }
  manufacturer && FIELDS.push({ lable: 'Manufacturer:', detail: manufacturer });
  model_number && FIELDS.push({ lable: 'Model number:', detail: model_number });
  serial_number &&
    FIELDS.push({ lable: 'Serial number:', detail: serial_number });
  barcode && FIELDS.push({ lable: 'Barcode:', detail: barcode });
  warranty_start_date &&
    FIELDS.push({ lable: 'Warranty start date:', detail: warranty_start_date });
  parts_warranty_duration &&
    FIELDS.push({
      lable: 'Parts warranty duration:',
      detail: `${parts_warranty_duration} ${
        warranty_duration_unit && warranty_duration_unit
      }`,
    });
  labour_warranty_duration &&
    FIELDS.push({
      lable: 'Labor warranty duration:',
      detail: `${labour_warranty_duration} ${
        warranty_duration_unit && warranty_duration_unit
      }`,
    });
  parts_warranty_guarantor &&
    FIELDS.push({
      lable: 'Parts warranty guarantor:',
      detail: parts_warranty_guarantor,
    });
  labour_warranty_guarantor &&
    FIELDS.push({
      lable: 'Labor warranty guarantor:',
      detail: labour_warranty_guarantor,
    });

  installation_date &&
    FIELDS.push({ lable: 'Installation Date', detail: installation_date });

  if (type_attributes) {
    for (const [key, value] of Object.entries(type_attributes)) {
      !_.isEmpty(value) && FIELDS.push({ lable: key, detail: value });
    }
  }

  if (instance_attributes) {
    for (const [key, value] of Object.entries(instance_attributes)) {
      !_.isEmpty(value) && FIELDS.push({ lable: key, detail: value });
    }
  }

  return FIELDS;
};

// Function to filter out components that are already in work order
export const filterComponents = (spaceComponents, workOrderComponents) => {
  if (!_.isEmpty(spaceComponents)) {
    let filtered = spaceComponents.reduce((acc, component) => {
      if (
        !workOrderComponents.find((i) => i.component === component.component.id)
      ) {
        acc.push(component);
      }
      return acc;
    }, []);
    return filtered;
  }
  return spaceComponents;
};

// function to check if in Dev
export const inDev = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return true;
  }
};
