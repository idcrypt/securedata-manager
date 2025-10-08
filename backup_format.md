# Backup File Format

The backup file is a JSON file containing all your secret entries, each encrypted using AES with your chosen master password.

## Example

```json
{
  "entries": [
    {
      "type": "seed_phrase",      // "password", "key_phrase", "note"
      "label": "Ethereum Wallet",
      "encrypted": "U2FsdGVkX1+3A...dll",
      "created_at": "2025-10-08T08:37:45Z"
    },
    {
      "type": "password",
      "label": "Gmail Account",
      "encrypted": "U2FsdGVkX1+3B...dll",
      "created_at": "2025-10-08T08:38:10Z"
    },
    {
      "type": "key_phrase",
      "label": "API Key",
      "encrypted": "U2FsdGVkX1+3C...dll",
      "created_at": "2025-10-08T08:38:25Z"
    }
  ]
}
```

- **type**: What kind of secret (seed_phrase, password, key_phrase, note)
- **label**: Your custom name for the secret
- **encrypted**: AES-encrypted secret string
- **created_at**: ISO date string

## Security Notes

- Your secrets are never stored in plain text, only encrypted.
- The master password is never saved in the file.
- If you lose your master password, you cannot recover your secrets!
