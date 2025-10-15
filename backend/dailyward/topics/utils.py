import secrets
import string

def generate_topic_code(length=8):
	"""Generate a secure random code for a topic."""
	alphabet = string.ascii_uppercase + string.digits
	return ''.join(secrets.choice(alphabet) for _ in range(length))
