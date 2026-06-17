// src/components/ContactHero/ContactForm.jsx
import { useState, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import "./ContactForm.scss";

// NUEVO: Importamos el archivo JSON local
import countriesData from "../../data/countries.json";

/**
 * Componente ContactForm.
 * Maneja el formulario de contacto incluyendo validaciones, formateo automático
 * de números telefónicos (prefijos) basado en un JSON de países, y protección
 * anti-spam (Honeypot). Utiliza FormSubmit para el envío de correos.
 * @param {Object} props
 * @param {Function} props.onSuccess - Callback ejecutado tras el envío exitoso de los datos.
 */
const ContactForm = ({ onSuccess }) => {
	const { t, i18n } = useTranslation();

	const [countryOptions, setCountryOptions] = useState([]);
	const [countryPrefixes, setCountryPrefixes] = useState({});
	const [formData, setFormData] = useState({
		nombre: "",
		correo: "",
		celular: "",
		pais: null,
		mensaje: "",
	});

	const [honeypot, setHoneypot] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	// Carga de países desde el JSON local
	useEffect(() => {
		try {
			const options = [];
			const prefixes = {};

			// Mapeamos los datos del JSON al formato que necesita react-select
			countriesData.forEach((country) => {
				const prefixStr = `+${country.phonecode}`;
				options.push({
					value: country.iso,
					label: country.nicename,
					prefix: prefixStr,
				});
				prefixes[country.iso] = prefixStr;
			});

			// Agregamos la opción "Otro"
			const otroLabel = t("contactHero.form.countries.other") || "Otro";
			options.push({ value: "Otro", label: otroLabel, prefix: "" });
			prefixes["Otro"] = "";

			setCountryOptions(options);
			setCountryPrefixes(prefixes);
		} catch (error) {
			console.error("Error procesando la lista de países:", error);
		}
	}, [t]);

	// Manejo de cambios estándar
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Manejo de cambio de país y actualización del prefijo
	const handleSelectChange = (selectedOption) => {
		setFormData((prev) => {
			const oldPrefix = prev.pais ? countryPrefixes[prev.pais.value] : "";
			const newPrefix = countryPrefixes[selectedOption.value] || "";

			let numberOnly = prev.celular;
			if (oldPrefix && numberOnly.startsWith(oldPrefix)) {
				numberOnly = numberOnly.substring(oldPrefix.length);
			}

			numberOnly = numberOnly.replace(/\D/g, "");

			return {
				...prev,
				pais: selectedOption,
				celular: newPrefix + numberOnly,
			};
		});
	};

	// Manejo de formato del teléfono (evita borrar el prefijo)
	const handlePhoneChange = (e) => {
		let rawValue = e.target.value;
		const currentCountry = formData.pais?.value;
		const prefix =
			currentCountry && currentCountry !== "Otro"
				? countryPrefixes[currentCountry]
				: "";

		if (prefix && !rawValue.startsWith(prefix)) {
			rawValue = prefix;
		}

		let userTypedPart = rawValue.substring(prefix.length);

		if (currentCountry === "Otro") {
			const hasPlus = userTypedPart.startsWith("+");
			userTypedPart = userTypedPart.replace(/\D/g, "");
			if (hasPlus) userTypedPart = "+" + userTypedPart;
		} else {
			userTypedPart = userTypedPart.replace(/\D/g, "");
		}

		if (userTypedPart.length > 15) {
			const maxLen = userTypedPart.startsWith("+") ? 16 : 15;
			userTypedPart = userTypedPart.substring(0, maxLen);
		}

		setFormData((prev) => ({ ...prev, celular: prefix + userTypedPart }));
	};

	// Envío del formulario vía FormSubmit (AJAX)
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitError(null);

		// Protección anti-spam (Honeypot)
		if (honeypot) {
			console.warn("Bot bloqueado.");
			setIsSubmitting(false);
			onSuccess(); // Simulamos éxito para despistar al bot
			return;
		}

		const payload = {
			nombre: formData.nombre,
			correo: formData.correo,
			celular: formData.celular,
			pais: formData.pais ? formData.pais.label : "No especificado",
			mensaje: formData.mensaje,
			idioma: i18n.language || "es",
			// Variables de configuración de FormSubmit
			_subject: `Nuevo mensaje de ${formData.nombre} desde la web`,
			_template: "table", // O usa "box" para un diseño diferente en tu correo
		};

		try {
			// Reemplaza "tu-correo@dominio.com" con el correo donde recibirás los mensajes
			const response = await fetch(
				"https://formsubmit.co/ajax/cbraco@gruposp.pe",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(payload),
				},
			);

			if (response.ok) {
				setIsSubmitting(false);
				onSuccess();
			} else {
				setSubmitError("error");
				setIsSubmitting(false);
			}
		} catch (error) {
			console.error("Error procesando el formulario:", error);
			setSubmitError("error");
			setIsSubmitting(false);
		}
	};

	return (
		<form className='contact-form' onSubmit={handleSubmit}>
			<div className='contact-form__header'>
				<h3>{t("contactHero.form.header")}</h3>
			</div>

			{/* Honeypot anti-spam oculto vía CSS */}
			<div className='contact-form__honeypot' aria-hidden='true'>
				<label htmlFor='_honey'>No llenes este campo si eres humano</label>
				<input
					type='text'
					id='_honey'
					name='_honey'
					value={honeypot}
					onChange={(e) => setHoneypot(e.target.value)}
					tabIndex='-1'
					autoComplete='off'
				/>
			</div>

			<div className='contact-form__group'>
				<label htmlFor='nombre'>{t("contactHero.form.labels.name")}</label>
				<input
					type='text'
					id='nombre'
					name='nombre'
					value={formData.nombre}
					onChange={handleChange}
					required
					maxLength={100}
					placeholder={t("contactHero.form.placeholders.name")}
				/>
			</div>

			<div className='contact-form__group'>
				<label htmlFor='correo'>{t("contactHero.form.labels.email")}</label>
				<input
					type='email'
					id='correo'
					name='correo'
					value={formData.correo}
					onChange={handleChange}
					required
					maxLength={150}
					placeholder={t("contactHero.form.placeholders.email")}
				/>
			</div>

			<div className='contact-form__row'>
				<div className='contact-form__group'>
					<label htmlFor='celular'>{t("contactHero.form.labels.phone")}</label>
					<input
						type='tel'
						id='celular'
						name='celular'
						value={formData.celular}
						onChange={handlePhoneChange}
						required
						placeholder={t("contactHero.form.placeholders.phone")}
					/>
				</div>

				<div className='contact-form__group'>
					<label htmlFor='pais'>{t("contactHero.form.labels.country")}</label>
					<Select
						inputId='pais'
						options={countryOptions}
						value={formData.pais}
						onChange={handleSelectChange}
						placeholder={t("contactHero.form.placeholders.select")}
						classNamePrefix='custom-select'
						required
					/>
				</div>
			</div>

			<div className='contact-form__group'>
				<label htmlFor='mensaje'>{t("contactHero.form.labels.message")}</label>
				<textarea
					id='mensaje'
					name='mensaje'
					value={formData.mensaje}
					onChange={handleChange}
					required
					rows='4'
					maxLength={1000}
					placeholder={t("contactHero.form.placeholders.message")}
				></textarea>
			</div>

			{submitError === "error" && (
				<p className='contact-form__feedback contact-form__feedback--error'>
					{t("contactHero.form.feedback.error")}
				</p>
			)}

			<button
				type='submit'
				className='contact-form__submit'
				disabled={isSubmitting}
			>
				<span>
					{isSubmitting
						? t("contactHero.form.buttons.sending")
						: t("contactHero.form.buttons.send")}
				</span>
				{isSubmitting ? (
					<Loader2 size={18} className='spin-animation' />
				) : (
					<Send size={18} />
				)}
			</button>
		</form>
	);
};

export default ContactForm;
