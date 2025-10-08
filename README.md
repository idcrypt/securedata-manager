# Secure Data Manager

**Secure Data Manager** is a privacy-first, client-side web app to securely store and backup your secret data (seed phrases, passwords, key phrases, notes) with AES encryption and multilingual support (English & Indonesian).

## Features

- Add seed phrases, passwords, key phrases, and secret notes
- AES encryption (client-side only)
- Download backup file (`.json`)
- Restore backup file (with password)
- Multilingual UI (English / Indonesia)
- No data ever leaves your device

## Usage

1. Open the app (via GitHub Pages or local)
2. Choose your language (English/Indonesia)
3. Add secret data with a label and master password
4. Download the encrypted backup file
5. Restore data by uploading the backup file and entering your password

## Development

To run locally:

```bash
npm install
npm start
```

## Encryption

All secret content is encrypted with AES using your master password. **Never forget your password!** Without it, your data cannot be recovered.

## Contributing

Pull requests and suggestions are welcome!

## License

MIT
