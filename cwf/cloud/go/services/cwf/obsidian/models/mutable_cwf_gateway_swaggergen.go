// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	strfmt "github.com/go-openapi/strfmt"
	models5 "magma/orc8r/cloud/go/models"
	models6 "magma/orc8r/cloud/go/services/orchestrator/obsidian/models"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// MutableCwfGateway CWF gateway object with read-only fields omitted
// swagger:model mutable_cwf_gateway
type MutableCwfGateway struct {

	// carrier wifi
	// Required: true
	CarrierWifi *GatewayCwfConfigs `json:"carrier_wifi"`

	// description
	// Required: true
	Description models5.GatewayDescription `json:"description"`

	// device
	Device *models6.GatewayDevice `json:"device,omitempty"`

	// id
	// Required: true
	ID models5.GatewayID `json:"id"`

	// magmad
	// Required: true
	Magmad *models6.MagmadGatewayConfigs `json:"magmad"`

	// name
	// Required: true
	Name models5.GatewayName `json:"name"`

	// tier
	// Required: true
	Tier models6.TierID `json:"tier"`
}

// Validate validates this mutable cwf gateway
func (m *MutableCwfGateway) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateCarrierWifi(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateDescription(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateDevice(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateID(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateMagmad(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateName(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateTier(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *MutableCwfGateway) validateCarrierWifi(formats strfmt.Registry) error {

	if err := validate.Required("carrier_wifi", "body", m.CarrierWifi); err != nil {
		return err
	}

	if m.CarrierWifi != nil {
		if err := m.CarrierWifi.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("carrier_wifi")
			}
			return err
		}
	}

	return nil
}

func (m *MutableCwfGateway) validateDescription(formats strfmt.Registry) error {

	if err := m.Description.Validate(formats); err != nil {
		if ve, ok := err.(*errors.Validation); ok {
			return ve.ValidateName("description")
		}
		return err
	}

	return nil
}

func (m *MutableCwfGateway) validateDevice(formats strfmt.Registry) error {

	if swag.IsZero(m.Device) { // not required
		return nil
	}

	if m.Device != nil {
		if err := m.Device.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("device")
			}
			return err
		}
	}

	return nil
}

func (m *MutableCwfGateway) validateID(formats strfmt.Registry) error {

	if err := m.ID.Validate(formats); err != nil {
		if ve, ok := err.(*errors.Validation); ok {
			return ve.ValidateName("id")
		}
		return err
	}

	return nil
}

func (m *MutableCwfGateway) validateMagmad(formats strfmt.Registry) error {

	if err := validate.Required("magmad", "body", m.Magmad); err != nil {
		return err
	}

	if m.Magmad != nil {
		if err := m.Magmad.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("magmad")
			}
			return err
		}
	}

	return nil
}

func (m *MutableCwfGateway) validateName(formats strfmt.Registry) error {

	if err := m.Name.Validate(formats); err != nil {
		if ve, ok := err.(*errors.Validation); ok {
			return ve.ValidateName("name")
		}
		return err
	}

	return nil
}

func (m *MutableCwfGateway) validateTier(formats strfmt.Registry) error {

	if err := m.Tier.Validate(formats); err != nil {
		if ve, ok := err.(*errors.Validation); ok {
			return ve.ValidateName("tier")
		}
		return err
	}

	return nil
}

// MarshalBinary interface implementation
func (m *MutableCwfGateway) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *MutableCwfGateway) UnmarshalBinary(b []byte) error {
	var res MutableCwfGateway
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
